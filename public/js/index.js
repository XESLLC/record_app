var skylink = new Skylink();
var peerIdGlobal = ""
var globalstream

skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.body.appendChild(vid);
});

skylink.on('incomingStream', function(peerId, stream, isSelf) {
  console.log(peerId, stream);
  peerIdGlobal = peerId;
  globalstream = stream;
  if(isSelf) return;
  var vid = document.getElementById(peerIdGlobal);
  attachMediaStream(vid, stream);
});

skylink.on('peerLeft', function(peerId) {
  var vid = document.getElementById(peerId);
  document.body.removeChild(vid);
});

skylink.on('mediaAccessSuccess', function(stream) {
  var vid = document.getElementById('myvideo');
  attachMediaStream(vid, stream);
});

skylink.init({
  apiKey: '*********************47923',
  defaultRoom: "roooooooom"
});

function start(event) {
  event.target.style.visibility = 'hidden';

  skylink.joinRoom({
    audio: false,
    video: false
  });
}

       var videosContainer = document.getElementById('videos-container');
       var mRecordRTC = new MRecordRTC();
       mRecordRTC.mediaType = {
           audio: true,
           video: true,
       };
       var RecorderType = GetRecorderType();
       var recorder = new RecorderType();


       //mRecordRTC.bufferSize = 16384;
       document.querySelector('#start').onclick = function() {
           this.disabled = true;
                          var video = document.createElement('video');
                          video.srcObject = globalstream;
                          video.play();
                          var mediaElement = getMediaElement(video, {
                              onMuted: function() {},
                              onUnMuted: function() {}
                          });
                          videosContainer.appendChild(mediaElement);
                          mRecordRTC.addStream(globalstream);
                          mRecordRTC.startRecording();
                        }

       document.querySelector('#stop').onclick = function() {
           this.disabled = true;
           mRecordRTC.stopRecording(function(url, type) {
               document.querySelector(type).src = url;
               document.querySelector(type).play();
               if (!!navigator.mozGetUserMedia) {
                   document.querySelector(type).onended = function() {
                       document.querySelector(type).src = URL.createObjectURL(mRecordRTC.getBlob()[type]);
                       document.querySelector(type).play();
                   };
               }
               mRecordRTC.writeToDisk();
               save.disabled = false;
           });
       };
       document.getElementById('save').onclick = function() {
           this.disabled = true;
           mRecordRTC.save({
             audio: true,
             video: true
           });
       };
       document.querySelector('#get').onclick = function() {
           this.disabled = true;
           !!navigator.webkitGetUserMedia && MRecordRTC.getFromDisk('all', function(dataURL, type) {
               if (!dataURL) return;
               if (type == 'audio') {
                   document.querySelector('#audio').src = dataURL;
               }
               if (type == 'video') {
                   var video = document.createElement('video');
                   video.src = dataURL;
                   var mediaElement = getMediaElement(video, {
                       buttons: ['mute-video'],
                       showOnMouseEnter: false,
                       enableTooltip: false,
                       onMuted: function() {
                           document.querySelector('#audio').muted = true;
                       },
                       onUnMuted: function() {
                           document.querySelector('#audio').muted = false;
                           document.querySelector('#audio').play();
                       }
                   });
                   videosContainer.appendChild(mediaElement);
                   document.querySelector('#audio').play();
                   mediaElement.media.play();
               }
               if (type == 'gif') {
                   var gifImage = document.createElement('img');
                   gifImage.src = dataURL;
                   videosContainer.appendChild(gifImage);
               }
           });
           !!navigator.mozGetUserMedia && MRecordRTC.getFromDisk('video', function(dataURL) {
               if (!dataURL) return;
               var video = document.createElement('video');
               video.src = dataURL;
               var mediaElement = getMediaElement(video, {
                   buttons: ['mute-video'],
                   showOnMouseEnter: false,
                   enableTooltip: false,
                   onMuted: function() {
                       mediaElement.muted = true;
                   },
                   onUnMuted: function() {
                       mediaElement.muted = false;
                       mediaElement.play();
                   }
               });
               videosContainer.appendChild(mediaElement);
               mediaElement.media.play();
           });
       };
       window.addEventListener('beforeunload', function() {
           document.querySelector('#start').disabled = false;
           document.querySelector('#stop').disabled = false;
           document.querySelector('#get').disabled = false;
       }, false);
