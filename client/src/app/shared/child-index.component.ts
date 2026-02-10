import { Component, computed, input } from '@angular/core';
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

  loadIndexResources = httpResource<Model[]>( () => {
    if (this.id() == 0) {
      return undefined;
    }

    return `/${this.containerService.endpointUrl}/${this.id()}/${this.modelService.api}`
  });

  isLoading = computed(() => this.loadIndexResources.isLoading());
  error = computed(() => this.loadIndexResources.error());
  values = this.loadIndexResources.value;
}