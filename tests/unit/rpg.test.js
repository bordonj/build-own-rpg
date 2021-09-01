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
    expect(rpg.resetAllNPCStore()).toEqual({
      npcs: []
    });
  })

})