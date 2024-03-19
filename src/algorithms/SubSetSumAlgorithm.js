export function getSubsetsWithSum(set, n, sum) {
   // Base Cases
   if (sum === 0) {
     return [[]];
   }
   if (n === 0) {
     return [];
   }
 
   let subsets = [];
 
   // Si el último elemento es mayor que la suma, se excluye
   if (set[n - 1] > sum) {
     subsets = getSubsetsWithSum(set, n - 1, sum);
   } else {
     // Incluir el último elemento
     const includedSubsets = getSubsetsWithSum(set, n - 1, sum - set[n - 1]);
      for (let subset of includedSubsets) {
         subset.push(set[n - 1]);
         subsets.push(subset);
      }
 
     // Excluir el último elemento
     const excludedSubsets = getSubsetsWithSum(set, n - 1, sum);
     subsets.push(...excludedSubsets);
   }
 
   return subsets;
}


