const shuffle = array => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = ~~(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
/*
  # TODO: Consider moving this computation to BE
  Expected output:
  [
    {
      id: 'abc',
      name: 'efg',
      ...
      options: [6, 7, 0, 13] <-- Three random unique indices and one correct index
    },
    ...
  ]
*/
export const formatSongs = songs => {
  const shuffledSongs = shuffle(songs);
  for (let i = 0; i < shuffledSongs.length; i++) {
    const arr = [];
    const correctIndex = ~~(Math.random() * 3);
    while (arr.length < 4) {
      if (correctIndex == arr.length) {
        arr.push(i);
        continue;
      }
      const randNum = ~~(Math.random() * shuffledSongs.length);
      if (arr.indexOf(randNum) === -1 && randNum != correctIndex) {
        arr.push(randNum);
      }
    }
    shuffledSongs[i].options = arr;
  }
  return { shuffledSongs };
};
