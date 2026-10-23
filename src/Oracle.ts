export type FivegramCount = {
    fCount: number; // Count of f's that have followed this fivegram
    dCount: number; // Count of d's that have followed this fivegram
}

// Oracle predicts guessed letters from the history of previously guessed letters
class Oracle {
    fivegramCounts: Map<string, FivegramCount> // Count of 
    recordedLetters: string[]

    constructor(fivegramCounts: Map<string, FivegramCount> = new Map()) {
        this.fivegramCounts = fivegramCounts
        this.recordedLetters = []
    }

    // Predict a new letter using the fivegram count history
    predictLetter(): string {
        let fivegramCount = this.fivegramCounts.get(this.recordedLetters.join(''))
        if (!fivegramCount) {
            return 'f'
        }
        if (fivegramCount?.dCount > fivegramCount?.fCount) {
            return 'd'
        } else {
            return 'f'
        }
    }

    // Record a letter input
    recordLetter(letter: string) {
        if (letter !== 'f' && letter !== 'd') {
            return // sanity check that the letter is valid
        }
        if (this.recordedLetters.length == 5) {
            // Add count if the previous letters form a fivegram
            let fivegram = this.recordedLetters.join('')
            let fivegramCount = this.fivegramCounts.get(fivegram)
            if (!fivegramCount) {
                fivegramCount = { fCount: 0, dCount: 0 }
            }
            if (letter === 'f') {
                fivegramCount.fCount++
            } else {
                fivegramCount.dCount++
            }
            this.fivegramCounts.set(fivegram, fivegramCount)
            this.recordedLetters = this.recordedLetters.filter((_, i) => i !== 0) // pop first element
        }
        this.recordedLetters.push(letter)
    }
}

export default Oracle