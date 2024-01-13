export function formatTimestamps(tableData) {
    return tableData.map(item => {
      ['active_time', 'create_time'].forEach(key => {
        // 检查是否是一个有效的时间戳（毫秒）
        if (item[key] && typeof item[key] === 'number' && !isNaN(new Date(item[key]).getTime())) {
          const date = new Date(item[key]);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          const seconds = String(date.getSeconds()).padStart(2, '0');
          item[key] = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
      });
      return item;
    });
  }

  export function revertTimestamps(tableData) {
    return tableData.map(item => {
      ['active_time', 'create_time'].forEach(key => {
        // 检查是否是一个有效的日期字符串
        if (item[key] && typeof item[key] === 'string') {
          const year = item[key].substring(0, 4);
          const month = item[key].substring(5, 7);
          const day = item[key].substring(8, 10);
          const hours = item[key].substring(11, 13);
          const minutes = item[key].substring(14, 16);
          const seconds = item[key].substring(17, 19);
          const date = new Date(year, month - 1, day, hours, minutes, seconds);
          item[key] = date.getTime(); // 转换为时间戳
        }
      });
      return item;
    });
  }

  