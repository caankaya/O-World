const NavBar = () => {
  return (
    <nav className="navbar bg-base-100 z-[1] bg-transparent flex items-center justify-between">
      <div className="flex mx-4">
        <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
      <div className="flex-auto">
          <input
          type="text"
          placeholder="Search..."
          className="input input-bordered border-[#0ff] w-full max-w-xs bg-transparent alien-font"
          />
      </div>
      <div className="flex justify-center w-full">
          <p className="alien-font shadow-neon">texte animé extraterrestre</p> 
      </div>
      <div className="flex-none">
        <div className="avatar m-2">
          <div className="w-10 rounded-full ring ring-[#0ff]">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="profil-picture" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar