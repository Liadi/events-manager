import db from './../models';

const { Log } = db;

function log(logData) {
  Log.create ({
    entityName: logData.entityName,
    entity: logData.entity,
    entityId: logData.entityId,
    userId: logData.userId,
    action: logData.action,
    before: logData.before,
    after: logData.after,
  }).catch((e)=> {
    // console.log('not logged, error => ', e);
    return;
  })
  // console.log('logged');
  return;
}

export {log};