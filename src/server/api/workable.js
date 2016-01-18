export default class Workable {
  constructor (fetch, key) {
    this.fetch = fetch;
    this.key = key;
  }

  getJobs () {
    return this.fetch('https://www.workable.com/spi/v3/accounts/redbadger/jobs?include_fields=description', {
      headers: {
        authorization: 'Bearer ' + this.key,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.body.jobs.map((job) => {
        return {
          title: job.title,
          description: job.description
        };
      });
    });
  }
}
