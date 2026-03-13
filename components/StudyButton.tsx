'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle } from 'lucide-react';

interface StudyButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function StudyButton({ onClick, isLoading = false, disabled = false }: StudyButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full max-w-md h-14 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white"
      size="lg"
    >
      {isLoading ? (
        <Spinner className="w-5 h-5" />
      ) : (
        <>
          <CheckCircle className="w-5 h-5 mr-2" />
          I Studied Today
        </>
      )}
    </Button>
  );
}
