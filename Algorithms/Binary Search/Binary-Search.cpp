#include<bits/stdc++.h>

using namespace std;

int binarySearch (vector<int> arr, int low, int high, int target) {
    // only sorted arrays
    
    if (low > high) return -1;
    
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;

    if (arr[mid] < target) return binarySearch(arr, mid + 1, high, target);
    else return binarySearch(arr, low, mid - 1, target);

    return -1;
}

int binarySearchIndexSort (vector<int> arr, vector<int> ind, int low, int high, int target) {
    if (low > high) return -1;
    
    int mid = low + (high - low) / 2;
    if (arr[ind[mid]] == target) return ind[mid];

    if (arr[ind[mid]] < target) return binarySearchIndexSort(arr, ind, mid + 1, high, target);
    else return binarySearchIndexSort(arr, ind, low, mid - 1, target);

    return -1;
}

int main() {
    int tc;
    cin>>tc;

    while (tc--) {
        int n;
        cin>>n;

        vector<int> arr(n, 0);
        for (int i = 0; i < n; i++) {
            int input;
            cin>>input;

            arr[i] = input;
        }

        int target;
        cin>>target;

        // ---------- First Way -----------
        // If sorted array
        // cout<<binarySearch(arr, 0, n - 1, target)<<endl;
        
        // ---------- Second Way -----------
        // If non-sorted array
        // sort(arr.begin(), arr.end());
        // cout<<binarySearch(arr, 0, n - 1, target)<<endl;
        
        // ---------- Third Way -----------
        // If non-sorted array, but you do not want to sort the original array and want to find the index of target value in original array
        // This gives you an index of array values in sorted order without changing original array
        vector<int> ind(n);
        for (int i = 0; i < n; i++) ind[i] = i;
        
        sort(ind.begin(), ind.end(), [&](int a, int b) {
            return arr[a] < arr[b];
        });
        
        cout<<binarySearchIndexSort(arr, ind, 0, n - 1, target)<<endl;
    }

    return 0;
}