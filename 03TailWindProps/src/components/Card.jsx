import React from 'react';

function Card(props) {
  console.log("Props are:", props);

// Note : Lets Say KOi btnText apne banaye card me pass nahi karta aur hum use kar rahe hain tho uski jagah hum default value de sakte hai in code and even as parameter.
  return (
    <div className="w-60 flex flex-col rounded-xl bg-black min-h-[19rem] text-white p-4">
      <div>
        <img
          src="https://cdn.vox-cdn.com/thumbor/ZkmdkuJUTLgJh96_FWQ5zweGGxo=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084330/bored_ape_nft_accidental_.jpg"
          alt="test"
          className="object-cover object-center rounded-t-xl"
        />
      </div>
      <div className="flex flex-col py-3 px-3 pb-10">
        <h1 className="font-bold text-lg">{props.channelName}</h1>
        <p>Username: {props.definedObject.username}</p>
        <p>Age: {props.definedObject.age}</p>
        <p>Gender: {props.definedObject.Gender}</p>
        <p>Array: {props.definedArray.join(", ")}</p>
        <p>Button: {props.btnText}</p>
      </div>
    </div>
  );
}

export default Card;
