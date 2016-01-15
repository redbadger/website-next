export default class Routes {
  constructor (workable) {
    this.workable = workable;
  }
  getJobs = (req, res) => {
    this.workable.getJobs().then(res.send.bind(res));
  };
}
