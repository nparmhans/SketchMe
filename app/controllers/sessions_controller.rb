class SessionsController < ApplicationController

	def index
		session[:name] = nil
		session[:number] = nil
	end

	def create
		if params[:name] == "" || params[:number] == ""
			flash[:errors] = "Empty field(s)"
			redirect_to "/sessions"
		else
			session[:name] = params[:name]
			session[:number] = params[:number]
			redirect_to "/games/categories"
		end
	end

end