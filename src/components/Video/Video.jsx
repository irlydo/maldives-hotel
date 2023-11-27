import BackgroundVideo from '../../assets/palm-trees.mp4'

export default function Video() {
  return (
    <video autoPlay muted loop id="bgvid" className="background-video">
      <source src={BackgroundVideo} type="video/mp4"></source>
    </video>
  );
}
