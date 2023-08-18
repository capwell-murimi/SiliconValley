import  Speaker from "./Speaker"
import ReactPlaceHolder from 'react-placeholder'
import  {   data   }  from    "../../SpeakerData"
import { useEffect, useState } from "react";

function SpeakersList({showSessions}) {

    const[speakersData,setSpeakersData]=useState([])
        const[isLoading,setIsLoading]=useState(true)
        const[hasErrored,setHasErrored]=useState(false)
        const[error,setError]=useState("")

        const delay =   (ms)    => new Promise((resolve) => setTimeout(resolve,ms))
        useEffect(()    =>  {
            async function delayFunc(){
            try {
                await delay(2000)
                setIsLoading(false)
                setSpeakersData(data)
            } 
            catch (e) {
                setIsLoading(false)
                setHasErrored(true)
                setError(e)
            }
            }
            delayFunc()
        },[])
        
        
        function onFavoriteToggle(id) {
            const speakersRecPrevious = speakersData.find((rec) =>  {
            return rec.id === id;
            });
            const speakerRecUpdated = {
            ...speakersRecPrevious,
            favorite: !speakersRecPrevious.favorite,
            };
            const speakersDataNew = speakersData.map((rec) =>   {
            return rec.id === id ? speakerRecUpdated : rec;
            });
        
            setSpeakersData(speakersDataNew);
        }
      if(hasErrored===true)return   <div    className="text-danger">
        ERROR:  <b>loading speaker data failed  {error}</b>
      </div>
    return (
        <div className="container speakers-list">
            <ReactPlaceHolder   type='media'    rows={30}   className="speakerslist-placeholder"    ready={isLoading===false}>
            <div className="row">
                {speakersData.map((speaker) => {
                    return (
                        <Speaker key={speaker.id} speaker={speaker} showSessions={showSessions} 
                        onFavoriteToggle={() => {
                            onFavoriteToggle(speaker.id)
                        }}/>
                    );
                })}
            </div>
            </ReactPlaceHolder>
        </div>
    );
}

export default SpeakersList