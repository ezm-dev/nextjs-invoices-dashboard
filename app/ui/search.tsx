'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {useSearchParams, usePathname, useRouter} from "next/navigation"
import {useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname= usePathname()
  const {replace} = useRouter()

  const handleSearch = useDebouncedCallback((term:string)=>{
    //console.log('Search term:', term);
    //get the current search params and update the query param with the new search term 
    const currentParams = new URLSearchParams(searchParams) 
    currentParams.set('page', '1') //reset the page to 1 when a new search is performed
    
    if(term){
      currentParams.set('query', term)
    }else{
      currentParams.delete('query')
    }
     replace(`${pathname}?${currentParams.toString()}`)
    
  },300)
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e)=>handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toLowerCase() || ''}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
