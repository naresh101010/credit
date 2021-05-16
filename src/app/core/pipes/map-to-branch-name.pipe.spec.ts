import { MapToBranchNamePipe } from './map-to-branch-name.pipe';

describe('MapToBranchNamePipe', () => {
  it('create an instance', () => {
    const pipe = new MapToBranchNamePipe();
    expect(pipe).toBeTruthy();
  });
});
