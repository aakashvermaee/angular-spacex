import * as _ from 'lodash';

import { IDeserialzable } from '../interfaces/IDeserializable';

export class SpacexProgram implements IDeserialzable {
  name?: string;
  missionIds?: any[];
  launchYear?: string;
  successfulLaunch?: boolean;
  successfulLanding?: boolean;
  image?: string;

  deserialize(input: any): this {
    this.name = this.getName(input);
    this.missionIds = _.get(input, 'mission_id', []);
    this.launchYear = _.get(input, 'launch_year', 'NA');
    this.successfulLaunch = _.get(input, 'launch_success');
    this.successfulLanding = _.get(input, 'rocket.first_stage.cores[0].land_success');
    this.image = _.get(input, 'links.mission_patch_small', '');

    return this;
  }

  private getName(input: any): string {
    return (
      _.trim(`${_.get(input, 'mission_name', '')} #${_.get(input, 'flight_number', '')}`) || 'NA'
    );
  }
}
