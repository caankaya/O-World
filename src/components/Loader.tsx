import OvniLoader from "./OvniLoader";


const FullPageLoader = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <OvniLoader />
      </div>
    );
  };
  
  export default FullPageLoader;