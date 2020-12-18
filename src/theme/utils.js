const utils = {
  checkAPIfailure: res => {
    console.log("in util check api failure")
  	console.log('------------------------', res.response)
    res = res.hasOwnProperty('response') ? res.response ? res.response : res : res;
    console.log('------------------------', res)
    console.log(`-----------------------------${JSON.stringify(res.data)}`);
    return res.data ? res.data : res;
  }
};

export default utils;
