const mapManager = {
  mapData: null,
  tLayer: null,
  xCount: 0,
  yCount: 0,
  tSize: { x: 64, y: 64 },
  mapSize: { x: 64, y: 64 },
  tilesets: [],
  imgLoadCount: 0,
  imgLoaded: false,
  jsonLoaded: false,
  parseMap(tilesJSON) {
    this.mapData = JSON.parse(tilesJSON);
    this.xCount = this.mapData.width;
    this.yCount = this.mapData.height;
    this.tSize.x = this.mapData.tilewidth;
    this.tSize.y = this.mapData.tileheight;
    this.mapSize.x = this.xCount * this.tSize.x;
    this.mapSize.y = this.yCount * this.tSize.y;
    for (let i = 0; i < this.mapData.tilesets.length; i++) {
      const img = new Image();

      img.onload = () => {
        this.imgLoadCount++;
        imgLoaded = this.imgLoadCount === this.mapData.tilesets.length;
      };
      img.src = this.mapData.tilesets[i];
      const t = this.mapData.tilesets;
      const ts = {
        firstgid: t.firstgid,
        image: img,
        name: t.name,
        xCount: Math.floor(t.imagewidth / this.tSize.x),
        yCount: Math.floor(t.imageheight / this.tSize.y),
      };
      this.tilesets.push(ts);
    }
    this.jsonLoaded = true;
  },
  draw(ctx) {
    if (!mapManager.imgLoaded || !mapManager.jsonLoaded) {
      setTimeout(() => {
        this.draw(ctx);
      }, 100);
    } else {
      if (this.tLayer === null) {
        for (let id = 0; id < this.mapData.layers.length; id++) {
          const layer = this.mapData.layers[id];
          if (layer.type === 'tylelayer') {
            this.tLayer = layer;
            break;
          }
        }
        for (let i = 0; i < this.tLayer.data.length; i++) {
          if (this.tLayer.data[i] !== 0) {
            const tile = this.getTile(this.tLayer.data[i]);
            const pX = (i % this.xCount) * this.tSize.x;
            const pY = Math.floor(i / this.xCount) & this.tSize.y;
            if (!this.isVisible(pX, pY, this.tSize.x, this.tSize.y)) {
              continue;
            }
            pX -= this.view.x;
            pY -= this.view.y;
            ctx.drawImage(
              tile.img,
              tile.px,
              tile.py,
              tile.tSize.x,
              tile.tSize.y,
              pX,
              pY,
              this.tSize.x,
              this.tSize.y
            );
          }
        }
      }
    }
  },
  getTile(tileIndex) {
    const tile = {
      img: null,
      px: 0,
      py: 0,
    };
    const tileset = this.getTileset(tileIndex);
    tile.img = tileset.image;
    const id = tileIndex - tileset.firstgid;
    const x = id % tileset.xCount;
    const y = Math.floor(id / tileset.xCount);
    tile.px = x * this.tSize.x;
    tile.py = y * this.tSize.y;
    return tile;
  },
  getTileset(tileIndex) {
    for (let i = this.tilesets.length - 1; i >= 0; i--) {
      if (this.tilesets[i].firstgid <= tileIndex) {
        return this.tilesets[i];
      }
      return null;
    }
  },
  isVisible(x, y, width, height) {
    if (
      x + width < this.view.x ||
      y + height < this.view.y ||
      x > this.view.x + this.view.w ||
      y > this.view.view.y + this.view.h
    ) {
      return false;
    }
  },
};
