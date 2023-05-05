import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useState, useEffect } from "react";

type Phoenetic = {
  text: string;
  audio: string;
};

type Definition = {
  definition: string;
  synonyms: Array<string>;
  antonyms: Array<string>;
};

type Meaning = {
  partOfSpeech: string;
  definitions: Array<Definition>;
  synonyms: Array<string>;
  antonyms: Array<string>;
};

type DictionaryResult = {
  word: string;
  phonetic: string;
  phonetics: Array<Phoenetic>;
  meanings: Array<Meaning>;
  sourceUrls: Array<string>;
};

type MainProps = {
  dictionaryResult: DictionaryResult;
};

function findPhoeneticsWithAudio(dictionaryResult: any): Phoenetic {
  const phoenetics: Array<Phoenetic> = dictionaryResult.phonetics;
  if (phoenetics.length > 0) {
    const filteredPhoenetics = phoenetics.filter(
      (phoenetic) => phoenetic.audio.trim() !== ""
    );
    if (filteredPhoenetics.length > 0) {
      return filteredPhoenetics[0];
    }
  }
  return { text: dictionaryResult.phonetic, audio: "" };
}

export default function Main({ dictionaryResult }: MainProps) {
  const [phoenetic, setPhoenetic] = useState(
    findPhoeneticsWithAudio(dictionaryResult)
  );
  const [audioPlayed, setAudioPlayed] = useState(false);

  return (
    <main className="space-y-4">
      {phoenetic.audio ? (
        <audio
          id="dictionary-audio"
          src={phoenetic.audio}
          onEnded={() => {
            setAudioPlayed(false);
          }}
        />
      ) : (
        ""
      )}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-extrabold text-4xl">{dictionaryResult.word}</h1>
          <p className="text-purple-600">{phoenetic.text}</p>
        </div>
        {phoenetic.audio ? (
          <button
            className="rounded-full w-12 h-12 flex justify-center items-center bg-purple-200 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const audioPlayer: HTMLAudioElement | null =
                document.getElementById("dictionary-audio") as HTMLAudioElement;
              if (audioPlayed) {
                audioPlayer.currentTime = 0;
                audioPlayer.pause();
              } else {
                audioPlayer.play();
              }
              setAudioPlayed(!audioPlayed);
            }}
          >
            {audioPlayed ? (
              <BsPauseFill className="text-purple-800" size={28} />
            ) : (
              <BsPlayFill className="text-purple-800" size={28} />
            )}
          </button>
        ) : (
          ""
        )}
      </div>

      {dictionaryResult.meanings.map((meaning: Meaning) => {
        return (
          <div className="flex flex-col space-y-6">
            <div className="flex flex-row space-x-6 items-center">
              <p>{meaning.partOfSpeech}</p>
              <hr className="flex-grow" />
            </div>
            <div className="flex flex-col space-y-4">
              <p className="text-gray-500">Meanings</p>
              <ul className="list-disc list-inside space-y-4">
                {meaning.definitions.map(
                  (definition: Definition, i: number) => {
                    return (
                      <li key={`definition-${i}`}>{definition.definition}</li>
                    );
                  }
                )}
              </ul>
              {meaning.synonyms.length > 0 ? (
                <span className="flex flex-row gap-4">
                  <p className="text-gray-500">Synonym</p>
                  <p className="text-purple-600">
                    {meaning.synonyms.join(", ")}
                  </p>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
      <hr className="flex-grow" />
      <div className="mt-6">
        <p className="text-gray-500">Source</p>
        <a href={dictionaryResult.sourceUrls[0]}>
          {dictionaryResult.sourceUrls[0]}
        </a>
      </div>
    </main>
  );
}
