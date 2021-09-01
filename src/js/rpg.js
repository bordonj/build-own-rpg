// This function stores our state.

export const storeState = () => {
  let currentState = {};

  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);

    currentState = { ...newState };
    return newState;
  }
}

export const stateControl = storeState();

// NPCs

export const allNPCStore = storeState()

export const resetAllNPCStore = () => {
  return allNPCStore(() => {
    return {}
  })
}

export const initNPCs = () => {
  return allNPCStore(() => {
    return {
      npcs: [
        {
          name: "Rocky",
          hp: 150,
        },
      ]
    }
  })
}

// Haikus

export const allHaikuStore = storeState()

export const resetAllHaikuStore = () => {
  return allHaikuStore(() => {
    return {}
  })
}

export const initHaikus = () => {
  return allHaikuStore(() => {
    return {
      haikus: [],
    }
  })
}

export const addHaiku = (line1,line2,line3,type) => {
  return allHaikuStore((previous) => {
    const totalHaikusCreated = (previous.totalHaikusCreated || 0) + 1
    return {
      haikus: [
        ...(previous.haikus || []),
        {
          line1,
          line2,
          line3,
          type,
          used: false,
          id: totalHaikusCreated,
        },
      ],
      totalHaikusCreated,
    }
  })
}

// This is a function factory. We can easily create more specific functions that alter a character's health/mana to varying degrees.

// export const changeState = (prop) => {
//   return (value) => {
//     return (state) => ({
//       ...state,
//       [prop]: (state[prop] || 0) + value
//     })
//   }
// }

// We create four functions using our function factory. We could easily create many more.

// export const feed = changeState("soil")(1);
// export const blueFood = changeState("soil")(5);

// export const hydrate = changeState("water")(1);
// export const superWater = changeState("water")(5);

// const currentPlants = initializeAllPlantStore()

// removes a plant by ID

// let totalPlantsCreated
// if ('totalPlantsCreated' in previous) {
//   totalPlantsCreated = previous.totalPlantsCreated
// } else {
//   totalPlantsCreated = 0
// }

// export function removePlant(id) {
//   return allPlantStore((previous) => {
//     const { totalPlantsCreated = 0 } = previous
//     // const totalPlantsCreated = previous.totalPlantsCreated || 0
//     return {
//       plants: (previous.plants || []).filter(plant => plant.id != id),
//       totalPlantsCreated,
//     }
//   })
// }

// Abilities

// export function plantHealth(id, health) {
//   return allPlantStore((previous) => {
//     const { totalPlantsCreated = 0 } = previous
//     // const totalPlantsCreated = previous.totalPlantsCreated || 0
//     const updatedPlants = previous.plants.map((item) => {
//       if (item.id === id) return { ...item, health }
//       else return item

//       // return item.id === id
//       //   ? { ...item, health }
//       //   : item
//     })

//     return {
//       plants: updatedPlants,
//       totalPlantsCreated,
//     }
//   })
// }
