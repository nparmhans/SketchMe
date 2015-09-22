require "json"
require "net/http"
require "open-uri"
require "rubygems"
require "twilio-ruby"

class NotificationsController < ApplicationController

skip_before_action :verify_authenticity_token

	def notify

		place = ["California", "Paris", "New York", "Washington DC", "Egypt", "Great Wall of China", "Golden Gate Bridge"]
		person = ["Oscar Vasquez", "Brian Chae", "Jo Min", "Kyle Shin"]
		thing = ["iPod", "flower", "pencil", "car", "cup", "laptop", "shoe", "glasses"]
		animal = ["panda", "dog", "otter", "bear", "bat", "camel", "butterfly", "mouse", "chicken", "turtle", "fox", "monkey", "salamander"]

		if params[:category] == "Place"
			@word = place[rand(0...place.length)]
		elsif params[:category] == "Person"
			@word = person[rand(0...person.length)]
		elsif params[:category] == "Thing"
			@word = thing[rand(0...thing.length)]
		elsif params[:category] == "Animal"
			@word = animal[rand(0...animal.length)]
		end

		account_sid = ["ENV"]
		auth_token = ["ENV"]
		@client = Twilio::REST::Client.new account_sid, auth_token
		@client.account.messages.create({
		:from => '+12053907745',
		:to => session[:number],
		:body => @word
		})

		redirect_to "/games"
	end
end