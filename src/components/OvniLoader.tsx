import { motion } from 'framer-motion';
import { ovniappearing, staggerContainer } from '../utils/motion';
import { useAppSelector } from '@/GlobalRedux/hooks';

const OvniLoader = () => {
  const ovniloaderWidth = useAppSelector((state) => state.home.currentWidth);
  const isSideBarOpen = useAppSelector((state) => state.home.sideBar);

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`mx-auto flex lg:flex-row flex-col gap-8 ${ isSideBarOpen ? 'float-right' : ''}`} 
        style={isSideBarOpen ? { width: ovniloaderWidth } : {}}
    >
      <motion.div
          variants={ovniappearing}
          className="flex-1 flex justify-center items-center"
        >
          <img
            src="/Ovni.png"
            alt="ovni"
            className="w-[70%] h-[70%] object-contain"
          />
      </motion.div>
    </motion.div>
  )
}

export default OvniLoader