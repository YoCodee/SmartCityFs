import React from 'react'

const Point = () => {
  return (
    <div className=' bg-[#ffbd59] p-6 mt-5'>
        <div className="flex h-full gap-7">
            <div className="Box1 flex flex-1 justify-center items-center">
                <div className="Text1 max-w-lg">
                <h1 className='text-3xl sm:text-5xl font-bold'>Apa itu Point ?</h1>
                <p className='text-lg sm:text-xl mt-2'>City Poin adalah Poin yang didapat
                dari masyarakat yang berhasil melakukan tugas mereka sesuai yang mereka pilih dan dapat ditukar menjadi reward</p>
                </div>
            </div>
            <div className="Box2 flex flex-1 flex-col w-96 h-96 mb-5">
                <div className="flex items-center justify-center ">
                    <h1 className='text-lg sm:text-3xl font-bold my-3'>3 Kategori poin</h1>
                </div>
                <div className="bg-black px-5 w-full  flex p-4 flex-col gap-5 ">
                    <div className="box100 bg-[#ffbd59] px-4 py-8 w-full">
                        <h1 className='text-center text-xl font-bold'>+100</h1>
                    </div>
                    <div className="box50 bg-[#4e656f] px-4 py-8 w-full">
                        <h1 className='text-center text-xl font-bold'>+50</h1>
                    </div>
                    <div className="box25 bg-[#f6f4e7] px-4 py-8 w-full">
                        <h1 className='text-center text-xl font-bold'>+25</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Point