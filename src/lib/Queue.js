import Bee from 'bee-queue';
import CancelationMail from '../app/jobs/CancelationMail';

import redisConfig from '../config/redis';

const jobs = [CancelationMail];

class Queue {
  constructor() {
    // Each background job has its own queue
    this.queues = {};

    this.init();
  }

  init() {
    jobs.map(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  enqueue(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.map(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Job: ${job.queue.name} FAILED`, err);
  }
}

export default new Queue();
