data = [
  { type: `Helmet`, name: `Serpentine Cruz Headpiece`, cost: 90, av: 23 },
  { type: `Leggings`, name: `Famed Pon Leggings`, cost: 87, av: 22 },
  { type: `Leggings`, name: `Ursine Trousers`, cost: 78, av: 18 },
  { type: `Helmet`, name: `Keeton Mask`, cost: 77, av: 24 },
  { type: `Leggings`, name: `Wolven Shinguards`, cost: 75, av: 15 },
  { type: `Leggings`, name: `Hansen's Breeches`, cost: 69, av: 17 },
  { type: `Helmet`, name: `Feline Visor`, cost: 68, av: 16 },
  { type: `Chest`, name: `Armor de Jandro`, cost: 67, av: 22 },
  { type: `Chest`, name: `Chestpiece of Vachon`, cost: 64, av: 23 },
  { type: `Boots`, name: `Diamond Boots`, cost: 64, av: 18 },
  { type: `Leggings`, name: `Griffin Pants`, cost: 62, av: 11 },
  { type: `Chest`, name: `Kaer Morhen Armor`, cost: 62, av: 21 },
  { type: `Helmet`, name: `Ornate Helmet of Cagampan`, cost: 60, av: 16 },
  { type: `Chest`, name: `Cured Leather Chestpiece`, cost: 59, av: 20 },
  { type: `Leggings`, name: `Tanned Leg Protection`, cost: 59, av: 15 },
  { type: `Chest`, name: `Smith's Plated Chestguard`, cost: 58, av: 10 },
  { type: `Chest`, name: `Dented Plate Armor`, cost: 57, av: 19 },
  { type: `Leggings`, name: `Manticore Braces`, cost: 56, av: 12 },
  { type: `Chest`, name: `Jeweled Drake Tunic`, cost: 55, av: 19 },
  { type: `Chest`, name: `Ginger's Gilded Armor`, cost: 54, av: 18 },
  { type: `Helmet`, name: `Offner Protector`, cost: 54, av: 15 },
  { type: `Leggings`, name: `Mail Emares Leggings`, cost: 53, av: 14 },
  { type: `Boots`, name: `Steel Boots`, cost: 52, av: 14 },
  { type: `Boots`, name: `Tate's Spiked Cleats`, cost: 52, av: 20 },
  { type: `Chest`, name: `Garcia Guard`, cost: 50, av: 17 },
  { type: `Helmet`, name: `Leather Helmet`, cost: 49, av: 13 },
  { type: `Leggings`, name: `Woven Leggings`, cost: 47, av: 11 },
  { type: `Helmet`, name: `Sligar's Noggin Protector`, cost: 46, av: 12 },
  { type: `Leggings`, name: `Silken Pants`, cost: 45, av: 10 },
  { type: `Helmet`, name: `Glass Bowl`, cost: 44, av: 12 },
  { type: `Leggings`, name: `Tattered Shorts`, cost: 42, av: 13 },
  { type: `Boots`, name: `Leather Lunde Shoes`, cost: 35, av: 7 },
  { type: `Boots`, name: `Cloth Shoes`, cost: 33, av: 5 },
];

//This looks like a variation on the bounded knapsack problem,
// and the optimal solution likely uses dynamic programming to make our recursion more efficient.
//I'm relatively weak on algorith optimization as it was not covered in the bootcamp I attended and
//I do not have a CS degree, so I'm in the process of teaching myself cs topics.
//I also was a bit too ambitious with my initial chat app plan and burned all my time trying to implement it,
//realizing I didn't have the time, and switching to a different setup, so I've neglected reading up on this topic
//enough to reach an optimal answer.

//Brute Force Solution

//Assumption 1: duplicate armor sets exist
//Assumption 2: data can be initially formatted as an array of objects

//Thought Process
//Create variable bestValueUnderLimit for best armor value under the cost limit, initial armor value of 0.
//split the data objects into arrays for each armor type
//make every combination of helmet+chest+leggings+boots+1-of-any
//use nested for loops to create all combinations and push to new array.
//excluded any combinations that cost more than 300.
//exclude any combination where av is less than bestValueUnderLimit.av.
//update bestValueUnderLimit with current object if cost<=300 and av> bestValueUnderLimit.av
//added a maximum possible cost check in each for loop that skips to the next loop if cost exceeds high acceptable value.
//time complexity for this is pretty inefficient.

//Answer returned:
// { names:
//   [ 'Chestpiece of Vachon',
//     'Keeton Mask',
//     'Tattered Shorts',
//     'Tate\'s Spiked Cleats',
//     'Chestpiece of Vachon' ],
//  cost: 299,
//  av: 103 }

//This function should work for any armor inventory provided
//assuming it it still split into the same categories and we're given a budget

function bruteForceBestAVforCost(dataArray, limit) {
  let sortedAV = dataArray.sort(function(a, b) {
    return b.av - a.av;
  });
  let chestArr = [];
  let helmetArr = [];
  let leggingsArr = [];
  let bootsArr = [];
  let bestValueUnderLimit = { av: 0 };
  for (let i = 0; i < sortedAV.length; i++) {
    if (sortedAV[i].type === "Chest") {
      chestArr.push(sortedAV[i]);
    }
    if (sortedAV[i].type === "Helmet") {
      helmetArr.push(sortedAV[i]);
    }
    if (sortedAV[i].type === "Leggings") {
      leggingsArr.push(sortedAV[i]);
    }
    if (sortedAV[i].type === "Boots") {
      bootsArr.push(sortedAV[i]);
    }
  }
  for (let j = 0; j < chestArr.length; j++) {
    for (let k = 0; k < helmetArr.length; k++) {
      let maxHelmetCost =
        300 -
        chestArr[j].cost -
        leggingsArr[leggingsArr.length - 1].cost -
        bootsArr[bootsArr.length - 1].cost -
        sortedAV[sortedAV.length - 1].cost;

      if (helmetArr[k].cost > maxHelmetCost) {
        continue;
      }
      for (let l = 0; l < leggingsArr.length; l++) {
        let maxLeggingsCost =
          300 -
          chestArr[j].cost -
          helmetArr[k].cost -
          bootsArr[bootsArr.length - 1].cost -
          sortedAV[sortedAV.length - 1].cost;

        if (leggingsArr[l].cost > maxLeggingsCost) {
          continue;
        }
        for (let m = 0; m < bootsArr.length; m++) {
          let maxBootsCost =
            300 -
            chestArr[j].cost -
            helmetArr[k].cost -
            leggingsArr[l].cost -
            sortedAV[sortedAV.length - 1].cost;

          if (bootsArr[m].cost > maxBootsCost) {
            continue;
          }
          for (let n = 0; n < sortedAV.length; n++) {
            let maxSortedAVCost =
              300 -
              chestArr[j].cost -
              helmetArr[k].cost -
              leggingsArr[l].cost -
              bootsArr[m].cost;

            if (sortedAV[n].cost > maxSortedAVCost) {
              continue;
            }
            let names = [
              chestArr[j].name,
              helmetArr[k].name,
              leggingsArr[l].name,
              bootsArr[m].name,
              sortedAV[n].name,
            ];
            let cost =
              chestArr[j].cost +
              helmetArr[k].cost +
              leggingsArr[l].cost +
              bootsArr[m].cost +
              sortedAV[n].cost;
            let av =
              chestArr[j].av +
              helmetArr[k].av +
              leggingsArr[l].av +
              bootsArr[m].av +
              sortedAV[n].av;
            let combination = { names: names, cost: cost, av: av };
            if (av > bestValueUnderLimit.av) {
              bestValueUnderLimit = combination;
            }
          }
        }
      }
    }
  }

  return bestValueUnderLimit;
}

console.log(bruteForceBestAVforCost(data, 300));
