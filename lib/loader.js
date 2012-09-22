Attachmenstein.Loader = function() {
    this._textures = {};
};

Attachmenstein.Loader.prototype.load = function(gl, src) {
    var texture = this._textures[src];
    if (texture) return texture;
    texture = new Attachmenstein.Texture(gl, src);
    console.log('Loaded new texture:', src);
    this._textures[src] = texture;
    return texture;
};

Attachmenstein.loader = new Attachmenstein.Loader();
