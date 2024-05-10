const map = L.map('map').setView([40.73061, -73.935242], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

class PriorityQueue {
  constructor(comparator = (a, b) => a[1] < b[1]) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  peek() {
    return this._heap[0];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > 0) {
      this._swap(0, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[0] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > 0 && this._greater(node, ((node + 1) >>> 1) - 1)) {
      this._swap(node, ((node + 1) >>> 1) - 1);
      node = ((node + 1) >>> 1) - 1;
    }
  }
  _siftDown() {
    let node = 0;
    while (
      ((node << 1) + 1 < this.size() && this._greater((node << 1) + 1, node)) ||
      (((node + 1) << 1) < this.size() && this._greater((node + 1) << 1, node))
    ) {
      let maxChild = (((node + 1) << 1) < this.size() && this._greater(((node + 1) << 1), (node << 1) + 1)) ? ((node + 1) << 1) : (node << 1) + 1;
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

async function fetchRoute(start, end) {
  const response = await fetch(`http://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`);
  const data = await response.json();
  const coordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
  return coordinates;
}

async function drawQuickestRoute(start, end) {
  const quickestRoute = await fetchRoute(start, end);
  const polyline = L.polyline(quickestRoute, { color: 'blue' }).addTo(map);
  map.fitBounds(polyline.getBounds());
}

const start = [35.773887195315126, -81.54613162725377]; 
const end = [35.76775002551494, -81.55787579058779];
drawQuickestRoute(start, end);
