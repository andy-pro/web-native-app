// import shortid from 'shortid'

const configureDeps = (initialState, platformDeps) => ({
  ...platformDeps,
  // shortid: shortid.generate,
  // getUid: () => platformDeps.uuid.v4(),
  // now: () => Date.now(),
  // validate,
});

export default configureDeps;
