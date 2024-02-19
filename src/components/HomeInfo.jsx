import {Link} from "react-router-dom";
import {arrow} from '../assets/icons/'

const InfoBox = ({text, link, btnText}) => (
  <div className='info-box'>
    <p className='font-medium sm:text-xl text-center'>{text}</p>
    <Link to={link} className='neo-brutalism-white neo-btn'>
      {btnText}
      <img src={arrow} alt="" className='w-4 h-4 object-contain' />
    </Link>
  </div>
)

const renderContent = {
  1: (
    <h1 className='sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'>
      Hi, I am <span className='font-semibold'>Yanni</span> 👋
      <br/>
      A Frontend developer from Brazil
    </h1>
  ),
  2: (
    <InfoBox
      text='Diving into the amazing world of 3D'
      link='/about'
      btnText='Learn more'
    />
  ),
  3: (
    <InfoBox
      text='Do you want to see what I have worked on? Check out some of my projects'
      link='/projects'
      btnText='Visit my portfolio'
    />
  ),
  4: (
    <InfoBox
      text="Looking for a frontend dev? I'm just a few keystrokes away"
      link='/contact'
      btnText="Let's talk"
    />
  ),
}


const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo
