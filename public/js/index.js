var skylink = new Skylink();

skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
  if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
  var vid = document.createElement('video');
  vid.autoplay = true;
  vid.muted = true; // Added to avoid feedback when testing locally
  vid.id = peerId;
  document.body.appendChild(vid);
});

skylink.on('incomingStream', function(peerId, stream, isSelf) {
  if(isSelf) return;
  var vid = document.getElementById(peerId);
  attachMediaStream(vid, stream);
});

skylink.on('peerLeft', function(peerId, peerInfo, isSelf) {
  var vid = document.getElementById(peerId);
  document.body.removeChild(vid);
});

skylink.on('mediaAccessSuccess', function(stream) {
  var vid = document.getElementById('myvideo');
  attachMediaStream(vid, stream);
});

skylink.init({
  apiKey: 'be12b9db-5491-401e-bb2e-608c13d47923',
  defaultRoom: 'davidroom'
}, function() {
  skylink.joinRoom({
    audio: true,
    video: true
  });
});



// var skylink = new Skylink();
//
// skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
//   if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
//   var vid = document.createElement('video');
//   vid.autoplay = true;
//   vid.muted = true; // Added to avoid feedback when testing locally
//   vid.id = peerId;
//   document.body.appendChild(vid);
// });
//
// skylink.on('incomingStream', function(peerId, stream, isSelf) {
//   if(isSelf) return;
//   var vid = gcAawUfCoRCG9fbUABCN(peerId);
//   attachMediaStream(vid, stream);
// });
//
// skylink.on('peerLeft', function(peerId) {
//   var vid = document.getElementById(peerId);
//   document.body.removeChild(vid);
// });
//
// skylink.on('mediaAccessSuccess', function(stream) {
//   var vid = document.getElementById('myvideo');
//   attachMediaStream(vid, stream);
// });
//
// skylink.init({
//   apiKey: 'be12b9db-5491-401e-bb2e-608c13d47923', // Get your own key at developer.temasys.com.sg
//   defaultRoom: 'davidroom'
// });
//
// function start(event) {
//   event.target.style.visibility = 'hidden';
//
//   skylink.joinRoom({
//     audio: false,
//     video: false
//   });
// }
//
//
// /* Helper functions */
//
// function getRoomId() {
//   var roomId = document.cookie.match(/roomId=([a-z0-9-]{36})/);
//   if(roomId) {
//     return roomId[1];
//   }
//   else {
//     roomId = skylink.generateUUID();
//     var date = new Date();
//     date.setTime(date.getTime() + (30*24*60*60*1000));
//     document.cookie = 'roomId=' + roomId + '; expires=' + date.toGMTString() + '; path=/';
//     return roomId;
//   }
// };
