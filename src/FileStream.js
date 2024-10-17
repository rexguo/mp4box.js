var FileStream = function(_file)
{
    this.file = _file;
    //this.bufferIndex = 0;

    //console.log("0: " + this.file.constructor.name);

    //(async() => {
        //this.buffer = await this.file.slice(0, this.file.size);

        //console.log(this.buffer);
    //})();

    //console.log("1: DONE");
}

FileStream.prototype = new DataStream(new ArrayBuffer(), 0, DataStream.BIG_ENDIAN);

FileStream.prototype.initialized = function() { return true; }

FileStream.prototype.cleanBuffers = function () 
{
    console.log("FS: cleanBuffers");
    // do nothing
}

FileStream.prototype.findPosition = function(fromStart, filePosition, markAsUsed)
{
    console.log("FS: findPosition: ", filePosition);
    
    // do nothing
    return -1;
}

/**
 * Displays the status of the buffers (number and used bytes)
 * @param  {Object} info callback method for display
 */
FileStream.prototype.logBufferLevel = function(info)
{
    // do nothing
}

FileStream.prototype.seek = function(filePosition, fromStart, markAsUsed)
{
    console.log("FS: seek: ", filePosition);

    this.position = filePosition;
    return true;
}

FileStream.prototype.getPosition = function()
{
    //console.log("FS: getPosition: ", this.position);

    return this.position;
}

FileStream.prototype.getLength = function()
{
    console.log("FS: getLength");

	return this.file.size;
}

FileStream.prototype.getEndPosition = function()
{
    return this.file.size;
}

if (typeof exports !== 'undefined') {
	exports.FileStream = FileStream;
}