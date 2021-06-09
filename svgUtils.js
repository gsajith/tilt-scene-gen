export const drawGround = (height, random, bumps, curve) => {
  let path = "M";
  path += " 0 100 ";
  path += "V " + (100 - height) + " ";
  let endPoint = 0;
  let prevEndpoint = 0;
  for (let i = 0; i < bumps; i++) {
    path += "Q ";
    prevEndpoint = endPoint;
    endPoint = Math.floor(random() * ((100 / bumps) * i - endPoint)) + endPoint;

    path +=
      Math.floor(random() * (endPoint - prevEndpoint)) + prevEndpoint + " ";
    path += Math.floor(random() * 90) + 10 + " ";

    if (i === bumps - 1) {
      path += "100 ";
    } else {
      path += endPoint + " ";
    }
    path += 100 - height + " ";
  }
  path += "V 100 ";
  path += "Z";
  return path;
};
