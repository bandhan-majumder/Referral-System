function DatabaseFailure() {
  return (
    <>
     <div className="max-w-7xl text-center mx-auto py-10 tracking-wide font-extrabold flex flex-col gap-14 mt-12 h-[80vh]">
        <h1 className="text-5xl">Failed to connect</h1>
        <h1 className="text-4xl">Check your internet connection</h1>
        <h1 className="text-3xl">Or try again later</h1>
     </div>
    </>
  )
}

export default DatabaseFailure
