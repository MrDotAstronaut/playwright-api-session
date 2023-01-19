import { apiRunner } from './utils/apis/apiRunner'; 
import { listOfTestCases } from './utils/testdata/apiTestData';

for(const testCase of listOfTestCases) {
  apiRunner(testCase);
}