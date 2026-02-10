import { Component, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ModelService } from '../models/model.service';

@Component({
  selector: 'app-child-index',
  standalone: true,
  imports: [],
  template: '',
  styleUrls: []
})
export class ChildIndexComponent<Model, ContainerModel>{
  id = input<number>(0);

  constructor(protected modelService: ModelService<Model>, protected containerService: ModelService<ContainerModel>) {

  }

  loadRacesResource = httpResource<Model[]>( () => {
    if (this.id() == 0) {
      return undefined;
    }

    return `/${this.containerService.endpointUrl}/${this.id()}/${this.modelService.api}`
  });

  isLoading = computed(() => this.loadRacesResource.isLoading());
  error = computed(() => this.loadRacesResource.error());
  values = this.loadRacesResource.value;
}