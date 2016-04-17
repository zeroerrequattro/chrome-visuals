var midi,data,target = $('section#plain');

// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
} 
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
    console.log('MIDI Access Object', midiAccess);
}
function onMIDIFailure(e) {
    // when we get a failed response, run this code
    log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}
function onMIDIMessage(message) {
    var data = message.data,
        cmd = data[0] >> 4,
        channel = data[0] & 0xf,
        type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
        note = data[1],
        velocity = data[2];
    
    //logger('key data',data);
    modder(channel,note,velocity);
}
function logger(label, data) {
    messages = label + " [channel: " + (data[0] & 0xf) + ", cmd: " + (data[0] >> 4) + ", type: " + (data[0] & 0xf0) + " , note: " + data[1] + " , velocity: " + data[2] + "]";
    console.log(messages);
}

function modder(channel,note,velocity) {
    val = ['','-'];
    val1 = val[Math.floor(Math.random() * 2)];
    val2 = Math.abs(100-Math.floor(note*velocity)/2); //getRandomIntInclusive(50,100);
    wid = val2 + 'vw';
    hei = 'calc(' + val2 + '% - 35px)';
    mHei = ((100 - val2) / 2) + 'vh';
    col = rColor();
    console.log(val2);
    if(channel == 0) {
        target.css('transform','translateX('+val1+(100-Math.floor(note*velocity)/2)+'vw)');
        //target.find('div.text').css('opacity','.' + Math.floor(Math.random() * 10));
    }
    if(channel == 1) {
        target.find('div.text').empty().append(note + ' ');
        target.css('width', wid );
    }
    if(channel == 2) {
        target.css('background-color',col).find('div.text').css('color',invertColor(col));
        target.css('transform','translateY('+val1+note+'px)');
    }
    if(channel == 3) {
        target.css({
            height: hei,
            marginTop: mHei
        });
        target.parent().css('background-color',col).find('h1').css('color',invertColor(col));
    }
}

function rColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1);           // remove #
    color = parseInt(color, 16);          // convert to integer
    color = 0xFFFFFF ^ color;             // invert three bytes
    color = color.toString(16);           // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color;                  // prepend #
    return color;
}
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}