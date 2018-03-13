import db from './../models';
import { log } from './util';

const { Log } = db;

module.exports = {
  getAllLogs(req, res) {
    const tempParams = req.query;
    const finalParams = {};
    for (let field in tempParams) {
      if (tempParams.hasOwnProperty(field) && tempParams[field]) {
        finalParams[field] = tempParams[field];
      }
    }
    Log.findAll().then((logs) => {
      return findLogs(logs, finalParams, res);
    }).catch((error) => {
      return res.status(400).json({
        message: 'invalid query',
        status: false,
      });
    });
  },
};

const searchLogs = ((logs, finalParams) => {
  const retLogs = [];
  for(let i in logs) {
    const log = logs[i];
    let foundIndex = 0;
    for (let key in finalParams) {
      switch(key) {
        case 'userId': {
          if (parseInt(log[key]) !== parseInt(finalParams[key])) {
            foundIndex = -1;
          }
          break;
        }
        case 'entity': {
          if (log[key] !== finalParams[key]){
            foundIndex = -1;
          }
          break;
        }
        case 'entityId': {
          if (parseInt(log[key]) !== parseInt(finalParams[key])){
            foundIndex = -1;
          }
          break;
        }
        case 'action': {
          if (log[key] !== finalParams[key]){
            foundIndex = -1;
          }
          break;
        }
      }
      if (foundIndex === -1) {
        break;
      }
    }
    if (foundIndex !== -1) {
      retLogs.push(log);
    }
  }
  return retLogs;
});

const findLogs = ((logs, finalParams, res ) => {
  let retLogs = searchLogs(logs, finalParams);
  if (finalParams['sort']) {
    const tempSortObj = JSON.parse(finalParams['sort'])
    retLogs.sort((a, b) => {
      if (tempSortObj['order'] === 'DESC'){
        return b[tempSortObj['item']] - a[tempSortObj['item']];
      }
      return a[tempSortObj['item']] - b[tempSortObj['item']];
    });
  }
  const totalElement = retLogs.length;
  const [limit, page] = [parseInt(finalParams['limit']), parseInt(finalParams['page'])];
  if ( limit && limit > 0) {
    if (page && page > 0) {
      retLogs = retLogs.slice((page - 1) * limit, page * limit);
    } else {
      retLogs = retLogs.slice(0, limit);
    }
  }

  if (retLogs.length > 0){
    return res.status(200).json({
      message: 'logs found',
      status: true,
      logs: retLogs,
      totalElement,
    });
  }
  return res.status(404).json({
    message: 'logs not found',
    status: false,
  })
});
