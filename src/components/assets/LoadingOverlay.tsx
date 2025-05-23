
export const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-[#4C36FF] flex flex-col items-center justify-center z-50">
      <h1 className="text-4xl font-bold text-[#EDEBFF] mb-2 font-gulfs">WIZORA</h1>
      <p className="text-[#EDEBFF] text-lg mb-6">Your Playable Ad Wizard</p>
      <div className="h-0.5 w-48 bg-[#EDEBFF] bg-opacity-30 relative overflow-hidden">
        <div className="h-full bg-[#EDEBFF] absolute left-0 w-1/3 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      </div>
      <p className="text-[#EDEBFF] text-sm mt-2 opacity-70">loading your preview</p>
    </div>
  )
}
