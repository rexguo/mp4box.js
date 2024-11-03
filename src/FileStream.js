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

    // App will add a field 'buffer' to this object.
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

    // If seek is outside of current buffer, then slice a new buffer

    if(filePosition  == this.file.size)
    {
        console.log("Seeking to EOF: ", filePosition);
        console.trace();
        return false;
    }

    if(filePosition < this.getPosition())
    {
        console.log("FS: seek: " + filePosition + ", backwards from: " + this.getPosition());
        //console.trace();
    }

    if(filePosition >= this.getEndPosition())
    {
        console.log("SEEK OUTSIDE BUFFER: " + filePosition + " > " + this.getEndPosition());
        return false;
    }

    this.position = filePosition - this.buffer.fileStart;

    console.log("buffer pos relative to filePosition: ", this.position);
    return true;
}

/**
 * Returns the current position in the file
 * @return {Number} the position in the file
 */
FileStream.prototype.getPosition = function()
{
    //console.log("FS: getPosition: ", this.position);

    return this.position + this.buffer.fileStart;
}

/**
 * Returns the length of the current buffer
 */
FileStream.prototype.getLength = function()
{
    console.log("FS: getLength");

	//return this.file.size;
    return this.buffer.byteLength;
}

/**
 * Returns the file position of the end of current buffer
 */
FileStream.prototype.getEndPosition = function()
{
    //return this.file.size;
    return this.buffer.fileStart + this.buffer.byteLength;
}

/**
 * Marks a given number of bytes as used in the current buffer for garbage collection
 * @param {Number} nbBytes 
 */
FileStream.prototype.addUsedBytes = function(nbBytes)
{
    // Stubbed out, not needed in FS implementation.

	//this.buffer.usedBytes += nbBytes;
	//this.logBufferLevel();
}

/**
 * From MultiBufferStream:
 * Finds the largest file position contained in a buffer or in the next buffers if they are contiguous (no gap)
 * starting from the given buffer index or from the current buffer if the index is not given.
 * 
 * Used by ISOFile.processIncompleteBox() when moov box is found.
 * 
 * @param  {Number} inputindex Index of the buffer to start from
 * @return {Number}            The largest file position found in the buffers
 */
FileStream.prototype.findEndContiguousBuf = function(inputindex)
{
    // Since we do not have multiple buffers, simply return the file position of end of current buffer
    return this.buffer.fileStart + this.buffer.byteLength;
}

if (typeof exports !== 'undefined') {
	exports.FileStream = FileStream;
}