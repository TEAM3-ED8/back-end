import { Reindeer } from "@prisma/client"
export const generateReindeerLineupPrompt = ({
  mission,
  reindeers
}: {
  mission: string
  reindeers: Reindeer[]
}) => {
  return `
  You are going to help me choose the reindeer indicated for this mission, these are my reindeer:
  ${reindeers.map(({ id, description_of_use }) => {
    return `
    Reindeer ID:"${id}"
    Description of use:${description_of_use}`
  })}

  And this is the mission: ${mission}

  With all this information I want you to return to me the ID of the
  reindeer that best fit the mission, you will realize which reindeer
  are better thanks to their description of use

  I want you to return the ids to me like this: [1, 12, 1, 4]
  In case you don't find anything, go back to []
  You have to strictly comply with that.
  just returns that, no more text, just that
  `
}
