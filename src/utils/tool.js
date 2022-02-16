export default function moveTo(start, end, dom, prop) {
  let dis = 0;
  let speed = 5;
  if (end < 0) {
    speed *= -1;
  }
  const t = setInterval(() => {
    dis += speed;
    // eslint-disable-next-line no-param-reassign
    dom[prop] = start + dis;
    if (Math.abs(dis) >= Math.abs(end)) {
      // eslint-disable-next-line no-param-reassign
      dom[prop] = start + end;
      clearInterval(t);
    }
  }, 2);
}
