"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface Song {
  id: string;
  title: string;
  url: string; // Placeholder URL
}

const songs: Song[] = [
  { id: 'song1', title: 'Romantic Melody', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'song2', title: 'Sweet Serenade', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'song3', title: 'Love Ballad', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export function MusicSelector() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (selectedSong && audioRef.current) {
      audioRef.current.src = selectedSong.url;
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      }
    }
  }, [selectedSong, isPlaying]);

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

  const handlePlayPause = () => {
    if (!selectedSong && songs.length > 0) {
      // Auto-select first song if none is selected
      setSelectedSong(songs[0]); 
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Attempt to play. This might require user interaction first on some browsers.
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSongChange = (songId: string) => {
    const song = songs.find(s => s.id === songId);
    if (song) {
      setSelectedSong(song);
      // If already playing, continue playing new song. If paused, stay paused.
      if (audioRef.current) {
        audioRef.current.src = song.url;
        if (isPlaying) {
            audioRef.current.play().catch(error => console.error("Error playing audio:", error));
        }
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
          Set The Mood
        </CardTitle>
        <CardDescription>Pick a tune to make this moment even more special.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={handleSongChange} defaultValue={selectedSong?.id}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a romantic song..." />
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
          <Button onClick={handlePlayPause} variant="outline" size="lg" className="flex-grow" disabled={!selectedSong && songs.length === 0}>
            {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button onClick={handleMuteToggle} variant="outline" size="icon" aria-label={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
