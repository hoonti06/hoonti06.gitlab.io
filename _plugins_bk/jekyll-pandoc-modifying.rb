module Jekyll
  module Converters
    class Markdown::Pandoc
      DEFAULT_EXTENSIONS = []
      DEFAULT_FORMAT = 'html5'
      DEFAULT_HIGHLIGHTER = '' 
      DEFAULT_LINENO = false

      def initialize(config)
        Jekyll::External.require_with_graceful_fail "pandoc-ruby"

        @config = config
      end

      def convert(content)
        extensions = config_option('extensions', DEFAULT_EXTENSIONS)
        format = config_option('format', DEFAULT_FORMAT)
        highlighter = config_option('syntax_highlighter', DEFAULT_HIGHLIGHTER)
        lineno = config_option('lineno', DEFAULT_LINENO)

#        if highlighter == 'rouge'
#          content = replace_code_block_with_rouge_liquid(content, lineno)
#          print(content, "\n\n\n")
#        end

        content = PandocRuby.new(content, *extensions).send("to_#{format}")
        raise Jekyll::Errors::FatalException, "Conversion returned empty string" unless content.length > 0
        content
      end

#      def matches(ext)
#        ext = ~/^\.md$/i
#      end
#
#      def output_ext(ext)
#        ".html"
#      end
      def config_option(key, default=nil)
        if @config['pandoc']
          @config.fetch('pandoc', {}).fetch(key, default)
        else
          default
        end
      end

      def replace_code_block_with_rouge_liquid(content, lineno)
        regex = /[[:blank:]]*\`\`\`(.*)\n([\w\W]*?)[[:blank:]]*\`\`\`[[:blank:]]*(\n|$)/

#        print(content.scan(regex).length, "\n")
#        print(content.scan(regex), "\n")

        content = content.gsub(regex) { |_|
          match = Regexp.last_match
          lang = match[1].delete(' ')

#          print("1 : ", lang, "\n")
#          print("2 : ", match[2], "\n")


          if match && lang.length > 0
            res = "{% highlight #{lang}"
            if lineno
              res += " linenos"
            end
#            res += " %}"+"\n"+"#{match[2]}"+"\n"+"{% endhighlight %}#{match[3]}"
            res += " %}\n#{match[2]}\n{% endhighlight %}#{match[3]}"
          else
            res = match
          end
          res
        }
#        print("\n\n<RES>\n", content, "\n")
        return content
      end #replace_code_block_to_rouge_liquid

    end # class
  end # module Converters
end # module Jekyll
