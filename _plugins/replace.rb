module Replace
	class Aaa
		def replace(text)
			print(text)
		end
	end
end

Jekyll::Hooks.register :wiki, :pre_render do |wiki|
#	regex = /(\s*) \`\`\`(.*) \n ([^]*?) (\s*) (\`\`\`) (\s*) (\n|$)/
	regex = /[[:blank:]]*\`\`\`(.*)\n([^]*?)[[:blank:]]\`\`\`[[:blank:]]\n|$/
#	"Hello".match(/[[:upper:]]+[[:lower:]]+l{2}o/) #=> #<MatchData "Hello">

	print(site)

	if wiki['ext'] == '.md'
#		print(wiki['ext'])
#		print(wiki)
#		print(wiki['title'])
#		aaa = Aaa;
#		aaa.repalce(wiki['title'])

#		wiki.content = wiki.content.gsub(regex, )
		aa = "7,11 / 5,214".gsub(/(\d),(\d+)/) { |_|
		    match = Regexp.last_match
			print("1 : ", match[1], "\n")
			print("2 : ", match[2], "\n")
		
		    "#{match[1]}.#{match[2]}"
			# https://stackoverflow.com/questions/26457321/ruby-regex-gsub-only-captured-group
		}
		print(aa, "\n")

	#	"""\d+""".r.replaceAllIn("one1two2three", m => (m.group(0).toInt + 1).toString)
	#	https://stackoverflow.com/questions/5675820/scala-regex-replace-with-anonymous-function

	end
end



#		aa = "  hi  1  2  "
#		print(aa.delete(' '), "\n")
		

#		wiki.content = "\naa\n"
#		print(wiki.content)

