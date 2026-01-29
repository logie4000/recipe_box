class Api::V1::DirectionsController < ApplicationController
  before_action :set_direction, only: %i[ update destroy ]

  # GET /directions
  def index
    if (params[:recipe_id])
      @recipe = Recipe.find(params[:recipe_id])
      @directions = @recipe.directions
    else
    #  @directions = Direction.all
    end
    
    render json: @directions
  end

  # PATCH/PUT /directions/1
  def update
    begin
      direction_params
    rescue StandardError => e
      raise ActiveRecord::RecordInvalid
    end

    if @direction.update(direction_params)
      render json: @direction, status: :no_content
    else
      render json: @direction.errors, status: :unprocessable_content
    end
  end

  # DELETE /directions/1
  def destroy
    @direction.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_direction
      @direction = Direction.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def direction_params
      params.expect(direction: [ :position, :step, :recipe_id ])
    end
end
