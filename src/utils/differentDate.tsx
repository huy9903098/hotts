export const differentDate = (date: string) => {
  const today = new Date();
  const diffDateSecond = Math.floor((today.getTime() - parseInt(date)) / 1000);
  let timeage = "";
  if (diffDateSecond < 60) {
    timeage = diffDateSecond + " seconds ago";
  } else if (diffDateSecond < 60 * 60) {
    const timeDay = Math.floor(diffDateSecond / 60);
    timeage = timeDay + (timeDay > 1 ? " minutes ago" : " minute ago");
  } else if (diffDateSecond < 60 * 60 * 24) {
    const timeDay = Math.floor(diffDateSecond / (60 * 60));
    timeage = timeDay + (timeDay > 1 ? " hours ago" : " hour ago");
  } else{
    const timeDay = Math.floor(diffDateSecond / (60 * 60 * 24));
    timeage = timeDay + (timeDay > 1 ? " days ago" : " day ago");
  }
  return timeage;
};
