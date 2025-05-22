
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  url: string;
}

const songs: Song[] = [
  { id: 'song1', title: 'Melodía Romántica', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'song2', title: 'Dulce Serenata', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'song3', title: 'Balada de Amor', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export function MusicSelector() {
  const thirdSong = songs.length > 2 ? songs[2] : null;
  const [selectedSong, setSelectedSong] = useState<Song | null>(thirdSong);
  const [isPlaying, setIsPlaying] = useState(!!thirdSong); // Attempt to play if thirdSong exists
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element on client side
    if (typeof window !== "undefined") {
        audioRef.current = new Audio();
        audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (selectedSong) {
      if (audioElement.src !== selectedSong.url) {
        audioElement.src = selectedSong.url;
        // When src changes, element pauses implicitly. 
        // If isPlaying is true, logic below handles playing.
      }

      if (isPlaying) {
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing audio (autoplay might be blocked):", error);
            // If play was rejected (e.g., user interaction needed, or media error)
            // update the state to reflect that it's not playing.
            setIsPlaying(false);
          });
        }
      } else {
        audioElement.pause();
      }
    } else {
      audioElement.pause();
      if (audioElement.src) { 
        audioElement.src = "";
      }
    }
  }, [selectedSong, isPlaying]);


  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (!selectedSong && songs.length > 0) {
      setSelectedSong(songs[0]);
      setIsPlaying(true); 
    } else if (selectedSong) {
      setIsPlaying(prevIsPlaying => !prevIsPlaying);
    }
  };

  const handleSongChange = (songId: string) => {
    const songToSelect = songs.find(s => s.id === songId);
    if (songToSelect) {
      if (selectedSong?.id !== songToSelect.id) {
        setSelectedSong(songToSelect);
        // If music was playing, it will continue with the new song (or attempt to).
        // If paused, it will load the new song and remain paused.
        // isPlaying state remains the same initially, useEffect handles actual play/pause.
      }
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-primary">
          <Music className="w-7 h-7" />
          Crea el Ambiente
        </CardTitle>
        <CardDescription>Elige una melodía para hacer este momento aún más especial.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={handleSongChange} value={selectedSong?.id || ""}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una canción romántica..." />
          </SelectTrigger>
          <SelectContent>
            {songs.map((song) => (
              <SelectItem key={song.id} value={song.id}>
                {song.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center justify-center space-x-4">
          <Button 
            onClick={handlePlayPause} 
            variant="outline" 
            size="lg" 
            className="flex-grow" 
            disabled={songs.length === 0 || !selectedSong} // Disable if no songs or no song selected
          >
            {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </Button>
          <Button onClick={handleMuteToggle} variant="outline" size="icon" aria-label={isMuted ? "Quitar Silencio" : "Silenciar"}>
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
        {isPlaying && selectedSong && (
             <p className="text-sm text-center text-muted-foreground">Reproduciendo: {selectedSong.title}</p>
        )}
      </CardContent>
    </Card>
  );
}

