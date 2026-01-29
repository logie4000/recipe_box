class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    begin
      user_params
    rescue StandardError => e
      raise ActiveRecord::RecordInvalid
    end

    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /users/1
  def update
    begin
      user_params
    rescue StandardError => e
      raise ActiveRecord::RecordInvalid
    end

    if @user.update(user_params)
      render json: @user, status: :no_content
    else
      render json: @user.errors, status: :unprocessable_content
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.expect(user: [ :username, :last_login, :password_digest, :first_name, :last_name, :roles ])
    end
end
