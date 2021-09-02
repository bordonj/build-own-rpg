import * as rpg from '../../src/js/rpg';
// import { expect } from '@jest/globals';

describe('storeState', () => {
  test("should start with state as an empty object", () => {
    const stateControl = rpg.storeState();
    const state = stateControl()
    expect(state).toEqual({});
  });

  test("should update", () => {
    const stateControl = rpg.storeState();
    const state = stateControl((previousState) => {
      return {
        ...previousState,
        property: "test"
      }
    })
    expect(state).toEqual({ property: "test" });
  });

  test("should update state multiple times", () => {
    const stateControl = rpg.storeState();

    stateControl((previousState) => {
      return {
        ...previousState,
        property: "test"
      }
    })
    const state2 = stateControl((previousState) => {
      return {
        ...previousState,
        property2: "another test"
      }
    })
    expect(state2).toEqual({ property: "test", property2: "another test" });
  });

  test("should update states separately without affecting eachother", () => {
    const stateControl = rpg.storeState();
    const stateControl2 = rpg.storeState();
    const state = stateControl((previousState) => {
      return {
        ...previousState,
        property: "test"
      }
    })
    const state2 = stateControl2((previousState) => {
      return {
        ...previousState,
        property2: "different test"
      }
    })
    expect(state).toEqual({ property: "test" });
    expect(state2).toEqual({ property2: "different test" });
  });

  test("should not update internal state outside of function", () => {
    const stateControl = rpg.storeState();
    const state = stateControl((previousState) => {
      return {
        ...previousState,
        property: "test"
      }
    })
    state.otherProperty = 'something else'
    const state2 = stateControl((previousState) => {
      return {
        ...previousState,
        yetAnotherProperty: "hello"
      }
    })
    expect(state2).toEqual({ property: "test", yetAnotherProperty: "hello" })
  });
})

describe('NPCs', () => {
  
  test("should erase NPCs in NPCStore", () => {
    expect(rpg.resetAllNPCStore()).toEqual({});
  })

  test("should initialize and have property npcs", () => {
    rpg.initNPCs();
    expect(rpg.allNPCStore()).toHaveProperty('npcs');
  })
})

describe('Haikus', () => {
  
  test("should erase Haikus in haikuStore", () => {
    expect(rpg.resetAllHaikuStore()).toEqual({});
  })

  beforeEach(() => {
    rpg.resetAllHaikuStore();
  });

  
  test("should have property haikus", () => {
    rpg.initHaikus();
    expect(rpg.allHaikuStore()).toHaveProperty('haikus');
  })
  
  test('should add haiku', () => {
    const newHaiku = rpg.addHaiku("I remember rock,", "and walking on the ceiling,", "all outside myself.", "rock" );
    expect(newHaiku).toEqual({
      haikus: [
        {
          line1: "I remember rock,",
          line2: "and walking on the ceiling,",
          line3: "all outside myself.",
          type: "rock",
          used: false,
          id: 1,
        },
      ],
      totalHaikusCreated: 1,
    })
  })
  
  test('should add another haiku and update id', () => {
    rpg.addHaiku("I remember rock,", "and walking on the ceiling,", "all outside myself.", "rock" );
    rpg.addHaiku("I remember paper,", "and walking on the ceiling,", "all outside myself.", "paper" );
    const haikuStore = rpg.allHaikuStore(); // result of a function... not an object that contains data that changes! 🤯
    
    expect(haikuStore).toEqual({
      haikus: [
        {
          line1: "I remember rock,",
          line2: "and walking on the ceiling,",
          line3: "all outside myself.",
          type: "rock",
          used: false,
          id: 1,
        },
        {
          line1: "I remember paper,",
          line2: "and walking on the ceiling,",
          line3: "all outside myself.",
          type: "paper",
          used: false,
          id: 2,
        },
      ],
      totalHaikusCreated: 2,
    })
  })

  describe('PCs', () => {
  
    test("should erase PCs in PCStore", () => {
      expect(rpg.resetPCStore()).toEqual({});
    })
  
    test("should initialize and have property pcs", () => {
      rpg.createPC();
      expect(rpg.PCStore()).toHaveProperty('name');
    })
  })

})

describe('Function Factory', () => {

  test("should change state of an NPC", () => {
    rpg.initNPCs();
    const changeHp = rpg.changeState("hp")(500)(0);


    rpg.allNPCStore(changeHp);
    // npcState(feed)
    expect(rpg.allNPCStore()).toEqual({
      npcs: [
        {
          name: "Rocky",
          hp: 650,
        },
      ]
    });
  })
})