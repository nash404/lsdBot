const checkWhatIs = async (checkData) => {
  let fullLink = /https\:\/\/www\.youtube\.com\/watch\?v=.*/,
    shortLink = /https:\/\/youtu\.be\/Z6pPLL5iUSE/;
  if (!checkData) return;
  if ((await checkData.match(fullLink)) || (await checkData.match(shortLink)))
    return "Link";
  return "Name";
};

module.exports.checkWhatIs = checkWhatIs;
